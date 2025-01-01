use crate::utils::run_command;
use colored::*;
use tracing::info;

pub fn upgrade_dependencies() -> anyhow::Result<()> {
    info!("{}", "Upgrading dependencies...".green());
    
    run_command("ncu", &["-u"])?;
    run_command("pnpm", &["install"])?;
    
    info!("{}", "Dependencies upgraded successfully!".green());
    Ok(())
}