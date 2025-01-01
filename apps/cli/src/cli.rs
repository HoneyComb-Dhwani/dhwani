use clap::{Parser, Subcommand};
use crate::commands;

#[derive(Parser)]
#[command(author, version, about, long_about = None)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Commands,
}

#[derive(Subcommand)]
pub enum Commands {
    Dev {
        #[command(subcommand)]
        command: commands::dev::DevCommands,
    },
    Build {
        #[command(subcommand)]
        command: commands::build::BuildCommands,
    },
    Start {
        #[command(subcommand)]
        command: commands::start::StartCommands,
    },
    Db {
        #[command(subcommand)]
        command: commands::db::DbCommands,
    },
    Docker {
        #[command(subcommand)]
        command: commands::docker::DockerCommands,
    },
    UpgradeDeps {
        #[command(subcommand)]
        command: commands::deps::UpgradeCommands
    },
    Lint,
    Format
}

impl Cli {
    pub fn execute(self) -> anyhow::Result<()> {
        match self.command {
            Commands::Dev { command } => command.execute(),
            Commands::Build { command } => command.execute(),
            Commands::Start { command } => command.execute(),
            Commands::Db { command } => command.execute(),
            Commands::Docker { command } => command.execute(),
            Commands::UpgradeDeps { command } => command.execute(),
            Commands::Lint => commands::lint(),
            Commands::Format => commands::format(),
        }
    }
}