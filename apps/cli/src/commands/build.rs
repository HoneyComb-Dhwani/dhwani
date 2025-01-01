use crate::utils::run_command;
use clap::Subcommand;

#[derive(Subcommand)]
pub enum BuildCommands {
    All,
    Server,
    Web,
}

impl BuildCommands {
    pub fn execute(self) -> anyhow::Result<()> {
        match self {
            BuildCommands::All => run_command("pnpm", &["build"]),
            BuildCommands::Server => run_command("pnpm", &["build:server"]),
            BuildCommands::Web => run_command("pnpm", &["build:web"]),
        }
    }
}
