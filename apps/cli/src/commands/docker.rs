use crate::utils::run_command;
use clap::Subcommand;

#[derive(Subcommand)]
pub enum DockerCommands {
    Up,
    Down,
}

impl DockerCommands {
    pub fn execute(self) -> anyhow::Result<()> {
        match self {
            DockerCommands::Up => run_command("docker-compose", &["up", "-d"]),
            DockerCommands::Down => run_command("docker-compose", &["down"]),
        }
    }
}