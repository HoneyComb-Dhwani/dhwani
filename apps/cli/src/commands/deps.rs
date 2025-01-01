use crate::utils::run_command;
use colored::*;
use tracing::info;
use clap::Subcommand;
use std::path::Path;

#[derive(Subcommand)]
pub enum UpgradeCommands {
    Root,
    Server,
    Web,
}

pub fn upgrade_root_dependencies() -> anyhow::Result<()> {
    info!("{}", "Upgrading dependencies...".green());
    
    run_command("ncu", &["-u"])?;
    run_command("pnpm", &["install"])?;
    
    info!("{}", "Dependencies upgraded successfully!".green());
    Ok(())
}

pub fn upgrade_web_dependencies() -> anyhow::Result<()> {
    info!("{}", "Upgrading web dependencies...".green());
    
    let web_path = Path::new("apps/web/package.json");
    if !web_path.exists() {
        return Err(anyhow::anyhow!("Web package.json not found at {}", web_path.display()));
    }

    run_command("cd", &["apps/web"])?;
    run_command("ncu", &["-u"])?;

    run_command("cd", &["../../"])?;
    run_command("pnpm", &["install"])?;
    
    info!("{}", "Web dependencies upgraded successfully!".green());
    Ok(())
}

pub fn upgrade_server_dependencies() -> anyhow::Result<()> {
    info!("{}", "Upgrading server dependencies...".green());

    let server_path = Path::new("apps/server/package.json");
    if !server_path.exists() {
        return Err(anyhow::anyhow!("Server package.json not found at {}", server_path.display()));
    }

    run_command("cd", &["apps/server"])?;
    run_command("ncu", &["-u"])?;
    run_command("cd", &["../../"])?;
    run_command("pnpm", &["install"])?;
    
    info!("{}", "Server dependencies upgraded successfully!".green());
    Ok(())
}

impl UpgradeCommands {
    pub fn execute(self) -> anyhow::Result<()> {
        match self {
            UpgradeCommands::Root => upgrade_root_dependencies(),
            UpgradeCommands::Server => upgrade_server_dependencies(),
            UpgradeCommands::Web => upgrade_web_dependencies(),
        }
    }
}