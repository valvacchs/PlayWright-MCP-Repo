# Plan Details Tests

Feature tests for MyAccount plan details functionality.

## 📋 Test Case

### [PLAN-001] Plan Details

**Status**: Active  
**Feature**: Plan Management  

#### Description
Comprehensive test of the Plan Details page including login, plan selection, page sections, links, document downloads, cost verification, and service request navigation.

#### Prerequisites
- User can access the MyAccount application
- At least one plan (10372247) is available in the dropdown
- Plan Details page is accessible

#### Test Scenarios

1. **[PLAN-001] should login to the application**
   - Verify the application loads with correct title
   - Verify Cinch branding is present
   - Expected: Login page displays correctly

2. **[PLAN-001] should select plan 10372247 from dropdown**
   - Check if plan 10372247 is already selected
   - If not, select it from the dropdown
   - Expected: Plan 10372247 is selected and confirmed

3. **[PLAN-001] should click on Plan Details button**
   - Locate the Plan Details button
   - Click to navigate to plan details page
   - Expected: Plan Details page loads

4. **[PLAN-001] should verify all sections on Plan Details page**
   - Check for Plan Overview section
   - Check for Plan Benefits section
   - Check for Plan Costs section
   - Check for Plan Documents section
   - Expected: All sections are present

5. **[PLAN-001] should verify links on Plan Details page**
   - Enumerate all available links
   - Verify links are present and clickable
   - Expected: Links are accessible

6. **[PLAN-001] should download Plan Document**
   - Locate Plan Document download button
   - Initiate download
   - Expected: File download is triggered

7. **[PLAN-001] should verify cost sections on Plan Details**
   - Check for Premium/Price information
   - Check for Deductible information
   - Check for Copay information
   - Check for Coverage information
   - Expected: Cost information is displayed

8. **[PLAN-001] should navigate to Item Selection page when clicking Request Service**
   - Click Request Service button
   - Verify navigation to Item Selection page
   - Expected: Item Selection page loads

#### Test Data

| Field | Value |
|-------|-------|
| Plan ID | 10372247 |
| Feature | Plan Details |
| Page | Plan Details |

#### Expected Results

- ✓ User can login successfully
- ✓ Plan 10372247 is selected
- ✓ Plan Details page loads
- ✓ All page sections are visible
- ✓ Links are accessible
- ✓ Plan Document can be downloaded
- ✓ Cost information is displayed
- ✓ Request Service navigates to Item Selection page

## 🚀 Running Tests

### Run all plan-details tests
```bash
npm run test:e2e -- test/e2e/specs/plan-details/
```

### Run specific test
```bash
npm run test:e2e -- --grep "\\[PLAN-001\\]"
```

### Run with UI mode
```bash
npm run test:e2e:ui -- test/e2e/specs/plan-details/
```

### Run in debug mode
```bash
npm run test:e2e:debug -- test/e2e/specs/plan-details/
```

## 📁 File Structure

```
plan-details/
├── plan-details.spec.ts    # Test implementation
└── README.md               # This file
```

## 🔗 References

- **Feature**: Plan Details
- **Plan ID**: 10372247
- **App URL**: https://myaccount-ui.qa.cinchhs.com/

## 📝 Notes

- Tests are designed to be resilient with fallback selectors
- Downloads are captured without saving files
- Tests wait for page loads before interacting
- Error handling gracefully continues if elements aren't found
- Test focuses on user workflows rather than implementation details

## ⚠️ Known Issues

- Plan dropdown selector may vary based on UI framework
- Download button location depends on page layout
- Item Selection page URL may vary

## 🔄 Maintenance

- Update selectors if UI components change
- Verify plan ID 10372247 exists in the system
- Update expected sections if page layout changes
- Monitor for broken links regularly
