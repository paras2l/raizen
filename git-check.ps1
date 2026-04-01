$status = git status --porcelain
$remote = git remote -v
$log = git log -n 5 --oneline
Write-Output "--- GIT STATUS ---"
Write-Output $status
Write-Output "--- GIT REMOTE ---"
Write-Output $remote
Write-Output "--- GIT LOG ---"
Write-Output $log
