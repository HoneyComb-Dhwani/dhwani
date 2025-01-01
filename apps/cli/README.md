# Dhwani CLI

Mainly made because I don't want to type `cd` every few minutes.

## Setup

1. Run `cargo build --release` inside `cli/`
2. Give execute permission if not already given `chmod +x target/release/cli`
3. Create symlink with absolute path `ln -sf "$(pwd)/target/release/cli" "$HOME/bin/dhwani"`
4. Verify symlink `ls -l ~/bin/dhwani`
5. Try running `dhwani`
6. If not added in path, run `export PATH="$HOME/bin:$PATH"`

(Windows):

1. `Copy-Item "target\release\cli.exe" "$env:USERPROFILE\bin\dhwani.exe"`
2. Add path `$userPath = [Environment]::GetEnvironmentVariable("Path", "User")`
3. Add the new path:

```powershell
 $newPath = "$env:USERPROFILE\bin"
if ($userPath -notlike "*$newPath*") {
    [Environment]::SetEnvironmentVariable(
        "Path",
        "$userPath;$newPath",
        "User"
    )
}
```
