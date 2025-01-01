use std::process::Command;
use colored::*;
use tracing::info;

pub fn run_command(command: &str, args: &[&str]) -> anyhow::Result<()> {
    info!("{} {} {}", "Running:".green(), command, args.join(" "));
    
    let status = Command::new(command)
        .args(args)
        .status()?;

    if !status.success() {
        anyhow::bail!("Command failed to execute successfully");
    }

    Ok(())
}