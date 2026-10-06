---
name: Dependency firewall
description: Handling blocked transitive dependencies during imported-project setup.
---

Updating a parent dependency to its latest release may still retain a blocked transitive version from the imported lockfile. If the latest parent still permits the blocked version, select a compatible safe transitive release using an override and regenerate the lockfile through the package installer.

**Why:** The package firewall blocked an imported dependency even after updating its parent; the parent's allowed version range still included the blocked release.

**How to apply:** Inspect both the latest parent dependencies and the transitive package's available versions. Do not bypass the security registry.
