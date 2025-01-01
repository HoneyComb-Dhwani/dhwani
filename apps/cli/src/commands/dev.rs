use crate::utils::run_command;
use clap::Subcommand;

#[derive(Subcommand)]
pub enum DevCommands {
    All,
    Server,
    Web,
}

impl DevCommands {
    pub fn execute(self) -> anyhow::Result<()> {
        match self {
            DevCommands::All => run_command("pnpm", &["dev"]),
            DevCommands::Server => run_command("pnpm", &["dev:server"]),
            DevCommands::Web => run_command("pnpm", &["dev:web"]),
        }
    }
}