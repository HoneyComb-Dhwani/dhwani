use crate::utils::run_command;
use clap::Subcommand;

#[derive(Subcommand)]
pub enum StartCommands {
    All,
    Server,
    Web,
}

impl StartCommands {
    pub fn execute(self) -> anyhow::Result<()> {
        match self {
            StartCommands::All => run_command("pnpm", &["start"]),
            StartCommands::Server => run_command("pnpm", &["start:server"]),
            StartCommands::Web => run_command("pnpm", &["start:web"]),
        }
    }
}