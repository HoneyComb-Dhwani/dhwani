use crate::utils::run_command;
use clap::Subcommand;

#[derive(Subcommand)]
pub enum DbCommands {
    Generate,
    Push,
}

impl DbCommands {
    pub fn execute(self) -> anyhow::Result<()> {
        match self {
            DbCommands::Generate => run_command("pnpm", &["--filter", "server", "db:generate"]),
            DbCommands::Push => run_command("pnpm", &["--filter", "server", "db:push"]),
        }
    }
}