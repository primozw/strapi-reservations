# Strapi v5 Migration Guide

This document outlines all changes made to migrate the **@weingerl/strapi-reservations** plugin from Strapi v4 to Strapi v5.

## 📋 Overview of Changes

The plugin has been successfully migrated to be compatible with Strapi v5. All major breaking changes have been addressed.

## ✅ Completed Changes

### 1. Updated Dependencies

**File: `package.json`**

- Updated `@strapi/strapi` peer dependency from `^4.0.0` to `^5.0.0`
- Updated `@strapi/design-system` from `^1.7.10` to `^2.0.0-rc.14`
- Updated `@strapi/icons` from `^1.7.10` to `^2.0.0-rc.14`
- **Removed** `@strapi/helper-plugin` (deprecated in v5)
- **Added** `axios: ^1.6.0` as explicit dependency (no longer aliased)
- **Updated** Node.js engine from `>=14.19.1 <=18.x.x` to `>=18.0.0 <=22.x.x`
- **Updated** npm engine from `>=6.0.0` to `>=8.0.0`

### 2. Backend: Entity Service → Document Service API

All Entity Service API calls have been migrated to the new Document Service API.

#### Changes Made:

**server/services/reservations.js:**

```javascript
// OLD (v4):
await strapi.entityService.findMany('plugin::strapi-reservations.reservation', {
  filters,
});

// NEW (v5):
await strapi
  .documents('plugin::strapi-reservations.reservation')
  .findMany({ filters });
```

```javascript
// OLD (v4):
await strapi.db.query('plugin::strapi-reservations.reservation').update({
  where: { id },
  data: { status },
});

// NEW (v5):
await strapi.documents('plugin::strapi-reservations.reservation').update({
  documentId: id,
  data: { status },
});
```

**server/controllers/schedules.js:**

- `create`: Changed from `entityService.create` to `documents().create`
- `update`: Changed from `entityService.update` to `documents().update` with `documentId`
- `delete`: Changed from `entityService.delete` to `documents().delete` with `documentId`
- `getAll`: Changed from `query().findMany` to `documents().findMany`
- `updateAll`: Updated bulk operations to use `documents().update`

**server/controllers/time-slots.js:**

- Updated reservation and schedule queries to use `documents().findMany`

### 3. Frontend: Removed @strapi/helper-plugin

All imports from the deprecated `@strapi/helper-plugin` have been replaced.

#### Import Replacements:

| Old (v4)                                                           | New (v5)                                                                      |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `import { auth } from '@strapi/helper-plugin'`                     | `import { auth } from '@strapi/strapi/admin'`                                 |
| `import { useNotification } from '@strapi/helper-plugin'`          | `import { useNotification } from '@strapi/strapi/admin'`                      |
| `import { LoadingIndicatorPage } from '@strapi/helper-plugin'`     | `import { Page } from '@strapi/strapi/admin'` then use `<Page.Loading />`     |
| `import { NotFound } from '@strapi/helper-plugin'`                 | `import { Page } from '@strapi/strapi/admin'` then use `<Page.Error />`       |
| `import { useCMEditViewDataManager } from '@strapi/helper-plugin'` | `import { unstable_useDocument } from '@strapi/content-manager/strapi-admin'` |
| `import { difference } from '@strapi/helper-plugin'`               | `import { difference } from 'lodash'`                                         |
| `import { wrapAxiosInstance } from '@strapi/helper-plugin'`        | Not needed - removed                                                          |

#### Updated Files:

1. **admin/src/utils/axiosInstance.js**

   - Replaced `auth` import
   - Removed `wrapAxiosInstance` wrapper

2. **admin/src/pages/Settings/index.js**

   - Updated imports for `Page`, `useNotification`, `difference`
   - Changed `LoadingIndicatorPage` to `Page.Loading`
   - Updated Layout components (see below)

3. **admin/src/components/Schedules/index.js**

   - Updated `auth` and `useNotification` imports

4. **admin/src/components/ReservationsCalendar/index.js**

   - Replaced `useCMEditViewDataManager` with `unstable_useDocument`
   - Updated property access from `slug` to `collectionType`

5. **admin/src/components/ReservationsButtons/index.js**

   - Replaced `useCMEditViewDataManager` with `unstable_useDocument`
   - Changed `modifiedData` to `values`
   - Changed `slug` to `collectionType`

6. **admin/src/pages/App/index.js**

   - Replaced `NotFound` with `Page.Error`

7. **admin/src/components/Schedules/Modal.js**
   - Updated `useNotification` import

### 4. Design System v2 Updates

Updated to use the new Design System v2 Layout components.

#### Changes:

```javascript
// OLD (v4):
import { HeaderLayout } from '@strapi/design-system/Layout';
import { ContentLayout } from '@strapi/design-system/Layout';

<HeaderLayout {...props} />
<ContentLayout>...</ContentLayout>

// NEW (v5):
import { Layouts } from '@strapi/design-system';

<Layouts.Header {...props} />
<Layouts.Content>...</Layouts.Content>
```

**Updated Files:**

- `admin/src/pages/Settings/index.js`
- `admin/src/pages/HomePage/index.js`

### 5. Hook Replacements

**useCMEditViewDataManager → unstable_useDocument**

```javascript
// OLD (v4):
const { slug, initialData, modifiedData } = useCMEditViewDataManager();

// NEW (v5):
const document = unstable_useDocument();
const { collectionType, initialValues, values } = document || {};
```

## 🔧 Installation & Setup

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Build the plugin:**

   ```bash
   npm run build
   # or
   yarn build
   ```

3. **In your Strapi v5 project:**
   ```bash
   npm install @weingerl/strapi-reservations@latest
   npm run build
   npm run develop
   ```

## ⚠️ Breaking Changes to Note

### 1. Document Service API

- All database operations now use `strapi.documents()` instead of `strapi.entityService`
- Update operations require `documentId` instead of `id`
- Content now has document IDs separate from entry IDs

### 2. Content Manager Hooks

- The `unstable_useDocument` hook is currently marked as unstable
- API may change in future Strapi releases
- Property names have changed (`slug` → `collectionType`, `modifiedData` → `values`)

### 3. Axios Instance

- No longer needs `wrapAxiosInstance` wrapper
- Direct export of axios instance works fine

## 🧪 Testing Checklist

After migration, test the following functionality:

- [ ] **Schedule Management**

  - [ ] Create new schedule
  - [ ] Edit existing schedule
  - [ ] Delete schedule
  - [ ] Reorder schedules (drag & drop)
  - [ ] Yearless schedules work correctly

- [ ] **Time Slots**

  - [ ] Automatic slot generation
  - [ ] Manual slot creation
  - [ ] API endpoints return correct data:
    - [ ] `/api/strapi-reservations/time-slots/day/:date`
    - [ ] `/api/strapi-reservations/time-slots/week/:date`
    - [ ] `/api/strapi-reservations/time-slots/month/:date`

- [ ] **Reservations**

  - [ ] Create new reservation
  - [ ] Edit reservation
  - [ ] Confirm reservation (status update + callback)
  - [ ] Cancel reservation (status update + callback)
  - [ ] Calendar displays correctly (Day/Week/Month views)
  - [ ] Time slot availability is accurate

- [ ] **Settings**

  - [ ] Update calendar settings
  - [ ] Configure holidays
  - [ ] Change colors
  - [ ] Save settings successfully

- [ ] **Internationalization**
  - [ ] UI translations work
  - [ ] Date formatting is correct

## 📝 Notes

### Optional: Plugin SDK Migration

While the plugin has been migrated to work with Strapi v5, it could optionally be restructured using the new Plugin SDK for better alignment with Strapi v5 architecture. This is not required for functionality but may simplify future maintenance.

### Callback Hooks

The callback hooks for reservation confirmation/cancellation continue to work the same way:

```javascript
// ./src/extensions/strapi-reservations/strapi-server.js
module.exports = (plugin) => {
  plugin.services.hooks = () => ({
    async onConfirm(ctx) {
      const { body: data } = ctx.request;
      // Handle confirmation (e.g., send email)
    },
    async onCancel(ctx) {
      const { body: data } = ctx.request;
      // Handle cancellation
    },
  });
  return plugin;
};
```

## 🐛 Known Issues

1. **unstable_useDocument**: This hook is marked as unstable in Strapi v5. Monitor Strapi updates for when this API stabilizes.

2. **Design System RC**: Currently using Release Candidate versions of Design System v2. Update to stable versions when available.

## 📚 Additional Resources

- [Strapi v5 Migration Guide](https://docs.strapi.io/cms/migration/v4-to-v5)
- [Document Service API Documentation](https://docs.strapi.io/dev-docs/api/document-service)
- [Design System v2 Migration](https://docs.strapi.io/cms/migration/v4-to-v5/breaking-changes/design-system)
- [Plugin Migration Guide](https://docs.strapi.io/cms/migration/v4-to-v5/additional-resources/plugins-migration)

## 🎉 Migration Complete

All critical changes for Strapi v5 compatibility have been implemented. The plugin is ready to use with Strapi v5!

---

**Migration Date:** November 4, 2025  
**Strapi Version:** v5.0.0+  
**Plugin Version:** 2.0.0 (v5 compatible)
