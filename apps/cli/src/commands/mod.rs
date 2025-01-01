pub mod build;
pub mod db;
pub mod deps;
pub mod dev;
pub mod docker;
pub mod start;

use crate::utils::run_command;

pub fn lint() -> anyhow::Result<()> {
    run_command("pnpm", &["lint"])
}

pub fn format() -> anyhow::Result<()> {
    run_command("pnpm", &["format"])
}