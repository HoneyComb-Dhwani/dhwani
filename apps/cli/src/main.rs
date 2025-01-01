mod cli;
mod commands;
mod utils;

use cli::Cli;
use clap::Parser;
use tracing::info;

fn main() {
    tracing_subscriber::fmt::init();

    let cli = Cli::parse();
    info!("Starting Dhwani CLI");

    if let Err(e) = cli.execute() {
        eprintln!("Error: {}", e);
        std::process::exit(1);
    }
}