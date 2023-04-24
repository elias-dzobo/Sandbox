use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod sandbackend {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct User {
    pub username: String,
    pub avatar: String,
    pub posts: Vec<Posts>,
    pub suscribers: Vec<User>
}

#[derive(Accounts)]
pub struct Posts {
    pub text: String,
    pub multimedia: String,
    pub user: User,
    pub likes: u64,
    pub comments: Vec<String>,
    pub points: u64 
}
