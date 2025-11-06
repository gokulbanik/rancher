## cleanup
# Check if any ArgoCD process is still using those sockets
sudo lsof | grep argocd | grep sock
sudo ss -xl | grep argocd
# To remove files older than 1 day
find /tmp -type s -name "argocd-*.sock" -mtime +1 -delete
# Docker or GitHub Actions jobs aren’t running
find /tmp -type d -name "docker-actions-toolkit-*" -mtime +1 -exec rm -rf {} +
# all unused temporary files (older than 1 day):
sudo find /tmp -type f -mtime +1 -delete
sudo find /tmp -type d -empty -delete
