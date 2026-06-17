# Security Specifications: Work Nexis Job Board and Authentication

## 1. Data Invariants
- **Job listings** can only be created by authenticated users.
- A job listing's `ownerId` must strictly match the authenticated user's `uid` at the time of creation and remain immutable.
- Document IDs for both jobs and users must conform to length and format rules (`isValidId`) to prevent system poisoning.
- User profile updates must be restricted to the authenticated user owning that profile (`request.auth.uid == userId`).
- Public reads are permitted for jobs to let anonymous users browse, but profile queries are restricted.

## 2. The "Dirty Dozen" Threat Payloads
Here are 12 specific JSON payloads designed to violate system constraints, which will be blocked:
1. **Creation of job with incorrect owner ID**: Setting `ownerId` to another user's UID.
2. **Anonymous job creation**: Unauthenticated user trying to create a job document.
3. **Privilege escalation on jobs**: Modifying a job listing owned by someone else.
4. **Altering immutable fields**: Changing the `ownerId` or `id` of an existing job listing during update.
5. **ID poisoning attack**: Using a 20KB bizarre string for `jobId` to cause Denial of Wallet.
6. **Payload size poisoning**: Injecting a massive 1MB string in job title.
7. **Type pollution**: Inserting an object schema inside string fields like `salary` or `type`.
8. **Invalid categorical enum state**: Placing non-supported enum states in the `type` parameter (e.g., `type: "Super-time"`).
9. **User spoofing profile creation**: Creating a user profile document with user ID `auth_jacker_123` while logged in as another UID.
10. **Shadow update on userProfile**: Appending un-whitelisted attributes (`isAdmin: true`) during user profile updates.
11. **Altering user profile email**: Attempting to alter another user's profile email.
12. **Tampering with timestamps**: Providing a custom backdated/future `createdAt` instead of a server timestamp.
