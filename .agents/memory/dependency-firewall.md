---
name: Dependency firewall
description: Handling blocked transitive dependencies during imported-project setup.
---

Updating a parent dependency to its latest release may still retain a blocked transitive version from the imported lockfile. If the latest parent still permits the blocked version, select a compatible safe transitive release using an override and regenerate the lockfile through the package installer.

**Why:** The package firewall blocked an imported dependency even after updating its parent; the parent's allowed version range still included the blocked release.

**How to apply:** Inspect both the latest parent dependencies and the transitive package's available versions. Do not bypass the security registry.

## Lockfile portability for external builds

Keep committed dependency download URLs publicly resolvable when the project also builds on external hosting. Preserve approved versions and integrity hashes; Replit package installations must still use its security registry.

**Why:** An external Render build failed because the package installer had written Replit-internal registry addresses into the lockfile. Those hostnames are not reachable outside Replit.

**How to apply:** After dependency changes, check the lockfile for private registry hostnames before sending it to external hosting. Normalize only the download URLs for already-approved packages, and verify the published integrity values match; do not disable or bypass the firewall for Replit installs.
