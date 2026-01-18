# Deployment Guide

How to deploy Classroom Essentials add-ons to Google Workspace Marketplace.

## Architecture: One Cloud Project Per Add-on

Each add-on gets its own Google Cloud project. This ensures:

- **Minimal permissions** — Users only grant what each app needs
- **Independent publishing** — Each add-on reviewed/approved separately
- **Isolated risk** — Issues with one app don't affect others

| Add-on | Cloud Project Name | OAuth Scope |
| ------ | ------------------ | ----------- |
| Classroom Timer | `classroom-timer` | `presentations` |
| Random Student Picker | `student-picker` | `spreadsheets` |
| Group Maker | `group-maker` | `spreadsheets` |
| Seating Chart Generator | `seating-chart` | `spreadsheets`, `presentations` |

## Prerequisites

1. **Google Account** with access to Google Cloud Platform
2. **clasp CLI** installed: `npm install -g @google/clasp`
3. **One Google Cloud Project per add-on** (see above)

## Costs

- **Apps Script**: Free
- **Google Cloud Project**: Free (no billable APIs used)
- **Marketplace registration**: $5 one-time fee (covers all your apps)

## Setup Google Cloud Project

Repeat these steps for each add-on you want to publish.

### 1. Create Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Create Project**
3. Name it after the add-on (e.g., "Classroom Timer")
4. Note the Project ID

### 2. Enable APIs

Enable only the APIs needed for this specific add-on:

| Add-on | APIs to Enable |
| ------ | -------------- |
| Classroom Timer | Google Slides API |
| Random Student Picker | Google Sheets API |
| Group Maker | Google Sheets API |
| Seating Chart Generator | Google Slides API, Google Sheets API |

### 3. Configure OAuth Consent Screen

1. Go to **APIs & Services → OAuth consent screen**
2. Choose **External** user type
3. Fill in:
   - **App name**: The add-on name (e.g., "Classroom Timer")
   - **User support email**: Your email
   - **App logo**: 128x128 PNG (optional but recommended)
   - **Application home page**: Your GitHub repo or website
   - **Privacy policy link**: Required for publishing (see below)
   - **Developer contact email**: Your email
4. Add scopes — only what this add-on needs:
   - Timer: `https://www.googleapis.com/auth/presentations`
   - Sheets-based add-ons: `https://www.googleapis.com/auth/spreadsheets`
5. Save and continue
6. Add test users (your email and any testers)

## Deploy with clasp

### 1. Login to clasp

```bash
clasp login
```

### 2. Create Apps Script Project

```bash
cd timer-addon
clasp create --type slides --title "Classroom Timer"
```

This creates `.clasp.json` with project info.

### 3. Link to Cloud Project

```bash
clasp setting projectId YOUR_PROJECT_ID
```

### 4. Push Code

```bash
clasp push
```

### 5. Deploy as Add-on

```bash
clasp deploy --description "v1.0 - Initial release"
```

Note the deployment ID returned.

### 6. Open in Browser

```bash
clasp open
```

## Publish to Workspace Marketplace

### 1. Prepare Assets

Create these assets for marketplace listing:

**Icons:**
- 128x128 icon (PNG)
- 32x32 icon (PNG)

**Screenshots:**
- At least 1 screenshot (1280x800)
- Show add-on in use
- Highlight key features

**Listing Details:**
- Short description (80 chars)
- Long description (4000 chars)
- Category: Education
- Language: English

### 2. Submit for Review

1. Go to [Google Workspace Marketplace SDK](https://console.cloud.google.com/marketplace)
2. Click **Add listing**
3. Fill in all details:
   - App name: "Classroom Timer"
   - Short description: "Simple countdown timer for Google Slides"
   - Long description: (from README)
   - Category: Education → Teacher Tools
4. Upload icons and screenshots
5. Set pricing: Free
6. Add support email
7. Link to privacy policy (see PRIVACY_POLICY.md)
8. Link to terms of service (if applicable)
9. Submit for review

### 3. Review Process

- **Timeline**: 3-5 business days
- **Requirements**:
  - Must follow [OAuth policies](https://developers.google.com/terms/api-services-user-data-policy)
  - Minimal permissions requested
  - Clear description of what add-on does
  - Privacy policy published

**Common rejection reasons:**
- Too many permissions requested
- Unclear description
- Missing privacy policy
- Broken functionality

## Update Existing Add-on

### Create New Version

```bash
# Make changes to code
# Then push and deploy new version

clasp push
clasp deploy --description "v1.1 - Added pause functionality"
```

### Update Marketplace Listing

1. Go to marketplace SDK console
2. Edit existing listing
3. Update version number and changelog
4. Re-submit if major changes

## Testing Before Publishing

### Test as Unpublished Add-on

1. Get deployment ID from `clasp deploy`
2. Share add-on with test users:
   - Go to Apps Script project
   - Click **Deploy → Test deployments**
   - Share link with testers
3. Testers install via special link
4. Gather feedback before public release

### Beta Testing Program

For larger beta:
1. Create Google Group for beta testers
2. Enable "Trusted Testers" in Marketplace SDK
3. Add Google Group email
4. Beta testers can install before public release

## Monitoring

### Usage Analytics

Apps Script provides basic analytics:
1. Open Apps Script project
2. Go to **Executions** tab
3. View execution logs and errors

### User Feedback

Monitor these channels:
- Marketplace reviews
- GitHub issues
- Support email
- Social media mentions

## Security Best Practices

1. **Minimal Permissions**: Only request scopes you need
2. **No External Servers**: Keep data in user's Google account
3. **No API Keys in Code**: Use Properties Service for secrets
4. **Input Validation**: Sanitize all user inputs
5. **Error Handling**: Never expose sensitive info in errors

## Versioning Strategy

Use semantic versioning:
- **v1.0.0**: Initial release
- **v1.0.1**: Bug fixes
- **v1.1.0**: New features (backward compatible)
- **v2.0.0**: Breaking changes

## Rollback Plan

If issues arise after deployment:
1. Apps Script keeps previous versions
2. Go to **Deploy → Manage deployments**
3. Select previous version
4. Update marketplace to point to old version
5. Fix issues, redeploy when ready

## Support

- **Apps Script Docs**: https://developers.google.com/apps-script
- **Workspace Add-ons**: https://developers.google.com/workspace/add-ons
- **Marketplace SDK**: https://developers.google.com/workspace/marketplace

---

Questions? Open an issue on GitHub.
