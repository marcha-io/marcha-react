# Marcha Roadmap

This document tracks the planned features for the Marcha resident portal. It is split into two sections: the **MVP** (the minimum set of features required for initial launch) and the **Full Roadmap** (the complete vision for the platform, organized by category).

---

## 🚀 MVP — Initial Launch

The MVP focuses on the three core features that make Marcha immediately useful to community members and property managers.

### Marketplace

- [ ] List an item for sale or free within the community
- [ ] Browse active listings with title, price, description, and photos
- [ ] Mark a listing as sold / remove a listing
- [ ] Contact a seller via in-app message thread
- [ ] Filter listings by category (furniture, electronics, services, free items, etc.)
- [ ] Image upload for listing photos (Supabase Storage)
- [ ] Listing detail page with seller profile and community badge

### Admin Dashboard

- [ ] Admin role and permissions model (admin vs. resident)
- [ ] Create, edit, and delete community announcements
- [ ] Pin an announcement to the top of the noticeboard
- [ ] Schedule an announcement to publish at a future date/time
- [ ] Manage community events: create, edit, cancel, delete
- [ ] Set event details: title, description, date/time, location, max attendees
- [ ] View RSVP list for an event
- [ ] Send a push/in-app notification to all residents when an announcement or event is posted

### Community Events (Resident-Facing)

- [ ] Browse upcoming events in the community
- [ ] RSVP to an event (attending / not attending)
- [ ] View event details: description, date, time, location, attendee count
- [ ] Create a community event (resident-initiated, subject to admin approval or direct posting)
- [ ] Receive notification when a new event is posted
- [ ] Calendar view of upcoming events

### Dashboard
- [ ] Recent messages received
- [ ] Upcoming Event
- [ ] Open maintance requests
- [ ] Market place preview
- [ ] Community Announcements

---

## 📋 Full Roadmap

The following features represent the complete product vision, prioritized by category. Items are drawn from a feature gap analysis against leading property management platforms (e.g., MyPlace, Fixflo, Qube PM).

---

### Resident Portal — Core Pages

- [ ] **Dashboard** — personalized summary of open maintenance requests, unread messages, upcoming events, and outstanding balance
- [ ] **Noticeboard** — view and search community announcements with rich text and attachments
- [ ] **Messages** — direct messaging between residents and property manager; threaded conversations
- [ ] **Notifications** — in-app notification centre with read/unread state and notification preferences
- [X] **Profile** — view and edit personal details, profile photo
- [ ] **Documents** — view and download lease agreement, building rules, insurance certificates, and other shared documents
- [ ] **Subletting** — submit a subletting request; view approval status

---

### Maintenance & Repairs

- [ ] Submit a maintenance request with category, description, and photo attachments
- [ ] Track request status (Open → In Progress → Resolved → Closed)
- [ ] Receive notifications on status changes
- [ ] Rate and review completed repairs
- [ ] View full history of past maintenance requests
- [ ] Emergency contact / out-of-hours reporting flow
- [ ] Contractor scheduling: view appointment slots and confirm visit times
- [ ] Admin: assign requests to contractors, update status, add internal notes
- [ ] Admin: bulk view of all open requests with priority and age filters
- [ ] Integration with Fixflo or equivalent works-order platform

---

### Service Charges & Payments

- [ ] View current service charge balance and payment history
- [ ] Download itemised service charge statements (PDF)
- [ ] Pay service charges online via Stripe or GoCardless
- [ ] Set up a direct debit / recurring payment
- [ ] Receive reminders for upcoming or overdue payments
- [ ] View and download invoices and receipts
- [ ] Admin: post charges to resident accounts
- [ ] Admin: mark payments as received (manual reconciliation)
- [ ] Admin: generate financial reports (arrears, collected, outstanding)

---

### Documents & File Management

- [ ] Resident document library: lease, EPC, fire safety, building insurance
- [ ] Upload documents from the resident side (e.g., proof of identity, pet permission forms)
- [ ] Admin: upload and categorise documents per building or per unit
- [ ] Document expiry tracking and renewal reminders (e.g., gas safety certificate)
- [ ] E-signature for lease renewals and consent forms
- [ ] Version history for updated documents

---

### Community & Social

- [ ] Community noticeboard with rich-text posts, images, and file attachments
- [ ] Resident directory (opt-in) — see who lives in the building
- [ ] Community polls and surveys
- [ ] Lost & found board
- [ ] Amenity booking: book communal spaces (gym, roof terrace, meeting room, parking)
- [ ] Amenity booking calendar with availability view
- [ ] Admin: manage amenity availability and booking rules

---

### Marketplace (Post-MVP Enhancements)

- [ ] Offer / counter-offer flow between buyer and seller
- [ ] Saved / watchlisted items
- [ ] Seller rating and review system
- [ ] Promoted listings (admin can feature items)
- [ ] Marketplace moderation tools for admin (remove listings, flag inappropriate content)
- [ ] Delivery / collection preference on listings

---

### Property Manager Portal

- [ ] Separate property manager login and dashboard
- [ ] Multi-building / multi-community management from a single account
- [ ] Resident management: add, remove, and update resident records
- [ ] Unit management: view occupancy, lease start/end dates, rent amount
- [ ] Bulk messaging: send announcements to all residents in a building
- [ ] Inspection scheduling and reporting
- [ ] Compliance tracker: gas safety, electrical, fire risk assessment due dates
- [ ] Contractor management: directory of approved contractors with contact details
- [ ] Reporting dashboard: occupancy rate, maintenance KPIs, payment collection rate

---

### Notifications & Communications

- [ ] Push notifications (web and mobile PWA)
- [ ] Email notifications for key events (new message, maintenance update, payment due)
- [ ] SMS notifications for urgent alerts (optional, resident-controlled)
- [ ] Notification preferences centre (per-channel, per-event-type)
- [ ] Admin: broadcast message to all residents or a subset (by floor, by building)
- [ ] Automated reminders: service charge due, lease renewal, inspection upcoming

---

### Mobile App

- [ ] Progressive Web App (PWA) with offline support and home screen install
- [ ] Native iOS app (React Native / Expo)
- [ ] Native Android app (React Native / Expo)
- [ ] Biometric login (Face ID / fingerprint)
- [ ] Push notifications via APNs and FCM
- [ ] Mobile-optimised camera upload for maintenance photos and marketplace listings

---

### Authentication & Accounts

- [X] Email/password sign-up and sign-in
- [ ] Google OAuth sign-in
- [ ] Apple sign-in (required for iOS App Store)
- [ ] Magic link / passwordless login
- [ ] Two-factor authentication (TOTP)
- [ ] Invite-only registration: residents join via a unique invite link sent by the property manager
- [ ] Account deletion and data export (GDPR compliance)

---

### Integrations

- [ ] Stripe — online payments and direct debit
- [ ] GoCardless — direct debit for service charges
- [ ] Fixflo — works-order and maintenance management
- [ ] Qube PM / Yardi — property management system data sync
- [ ] DocuSign / HelloSign — e-signature for lease documents
- [ ] Twilio — SMS notifications
- [ ] Google Calendar / iCal — export community events
- [ ] Zapier / webhooks — custom automation for property managers

---

### Design System & Developer Experience

- [ ] Centralised design tokens (colors, typography, spacing) *(in progress)*
- [ ] Ant Design ConfigProvider theme applied globally *(in progress)*
- [ ] Component library / Storybook documentation
- [ ] End-to-end tests (Playwright or Cypress)
- [ ] Unit tests for critical business logic (React Testing Library)
- [ ] CI/CD pipeline: lint, test, and build on every PR
- [ ] Staging environment with preview deployments (Vercel / Netlify)
- [ ] Error monitoring (Sentry)
- [ ] Analytics (PostHog or Mixpanel)
- [ ] Accessibility audit and WCAG 2.1 AA compliance

---

### Compliance & Security

- [ ] GDPR-compliant data handling and privacy policy
- [ ] Cookie consent banner
- [ ] Data retention and deletion policies
- [ ] Role-based access control (resident, property manager, admin, super-admin)
- [ ] Audit log for admin actions (who changed what and when)
- [ ] Penetration testing and security review before public launch
