import React, { useState, useEffect } from "react";

// Post component to render individual posts
const Post = ({ author, content }) => (
  <div className="post">
    <h3>{author}</h3>
    <p>{content}</p>
  </div>
);

// App component to handle state and display posts
const App = () => {
  const [posts, setPosts] = useState([]); // State to store posts
  const [newPost, setNewPost] = useState(""); // State to store new post
  const [walletAddress, setWalletAddress] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!walletAddress) {
      alert('connect your wallet to post');
    } else {
      // Create a new post object and add it to the posts array
      const post = { author: "User", content: newPost };
      setPosts([...posts, post]);
      setNewPost(""); // Reset new post input
      }
    
  };

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log('Phantom Wallet is Found');

      const response = await window.solana.connect({ onlyIfTrusted: true});
      console.log('Connected with public key', response.publicKey.toString());

      setWalletAddress(response.publicKey.toString());
    } else {
      alert('Solana Object not found! get a phantom wallet');
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  const connectWallet = async () => {
    const {solana} = window;
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with public key', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className='cta-button connect-wallet-button'
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  return (
    <div className="App">
      <h1>The Sandbox</h1>
      <nav className="navbar">
        <ul>
      
          {!walletAddress && renderNotConnectedContainer()}
          
        </ul>
      </nav>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          rows={4}
          cols={30}
        />
        <br />
        <button type="submit">Post</button>
      </form>
      <h2>Timeline</h2>
      {posts.map((post, index) => (
        <Post key={index} author={post.author} content={post.content} />
      ))}
    </div>
  );
};

export default App;
