// Mock data for Debt Detector application

export const userData = {
  name: "John Doe",
  email: "john.doe@gmail.com",
  assignedPhone: "+1 (555) 123-4567",
  assignedAddress: {
    name: "John Doe",
    street: "1234 Protected Mail Center",
    suite: "Suite #VM789",
    city: "Privacy City",
    state: "PC",
    zipCode: "12345"
  },
  subscription: {
    plan: "Premium Protected Services",
    status: "Active",
    nextBilling: "2025-02-15",
    amount: "$29.99"
  }
};

export const recentCalls = [
  {
    id: 1,
    callerName: "Debt Recovery Solutions",
    callerNumber: "+1 (800) 555-0123",
    date: "2025-01-15",
    time: "2:34 PM",
    status: "Voicemail Played",
    duration: "0:45",
    blocked: false
  },
  {
    id: 2,
    callerName: "Financial Recovery Inc",
    callerNumber: "+1 (877) 555-0456",
    date: "2025-01-14",
    time: "11:22 AM",
    status: "Voicemail Played",
    duration: "1:12",
    blocked: false
  },
  {
    id: 3,
    callerName: "Collection Agency LLC",
    callerNumber: "+1 (866) 555-0789",
    date: "2025-01-13",
    time: "4:15 PM",
    status: "Voicemail Played",
    duration: "0:33",
    blocked: false
  },
  {
    id: 4,
    callerName: "Credit Solutions Corp",
    callerNumber: "+1 (855) 555-0321",
    date: "2025-01-12",
    time: "9:45 AM",
    status: "Voicemail Played",
    duration: "0:58",
    blocked: false
  },
  {
    id: 5,
    callerName: "Recovery Partners",
    callerNumber: "+1 (844) 555-0654",
    date: "2025-01-11",
    time: "1:20 PM",
    status: "Voicemail Played",
    duration: "1:05",
    blocked: false
  }
];

export const recentMail = [
  {
    id: 1,
    sender: "Debt Recovery Solutions",
    subject: "Final Notice - Account #12345",
    date: "2025-01-15",
    status: "unread",
    preview: "This is a final notice regarding your outstanding balance...",
    important: false
  },
  {
    id: 2,
    sender: "Financial Recovery Inc",
    subject: "Payment Required - Immediate Action",
    date: "2025-01-14",
    status: "read",
    preview: "Your account requires immediate attention. Please contact us...",
    important: true
  },
  {
    id: 3,
    sender: "Collection Agency LLC",
    subject: "Settlement Offer - Limited Time",
    date: "2025-01-13",
    status: "read",
    preview: "We are prepared to offer you a settlement option...",
    important: false
  },
  {
    id: 4,
    sender: "Credit Solutions Corp",
    subject: "Legal Action Notice",
    date: "2025-01-12",
    status: "unread",
    preview: "Please be advised that legal proceedings may commence...",
    important: true
  },
  {
    id: 5,
    sender: "Recovery Partners",
    subject: "Account Verification Required",
    date: "2025-01-11",
    status: "read",
    preview: "We need to verify your current contact information...",
    important: false
  }
];

export const allCalls = [
  ...recentCalls,
  {
    id: 6,
    callerName: "Debt Management Co",
    callerNumber: "+1 (833) 555-0987",
    date: "2025-01-10",
    time: "3:30 PM",
    status: "Voicemail Played",
    duration: "0:42",
    blocked: false
  },
  {
    id: 7,
    callerName: "Asset Recovery LLC",
    callerNumber: "+1 (822) 555-0147",
    date: "2025-01-09",
    time: "10:15 AM",
    status: "Voicemail Played",
    duration: "1:23",
    blocked: false
  },
  {
    id: 8,
    callerName: "Collection Services Inc",
    callerNumber: "+1 (811) 555-0258",
    date: "2025-01-08",
    time: "2:45 PM",
    status: "Voicemail Played",
    duration: "0:55",
    blocked: false
  }
];

export const allMail = [
  ...recentMail,
  {
    id: 6,
    sender: "Debt Management Co",
    subject: "Account Status Update",
    date: "2025-01-10",
    status: "read",
    preview: "Your account status has been updated. Please review...",
    important: false
  },
  {
    id: 7,
    sender: "Asset Recovery LLC",
    subject: "Payment Plan Options",
    date: "2025-01-09",
    status: "unread",
    preview: "We offer flexible payment plan options for your account...",
    important: false
  },
  {
    id: 8,
    sender: "Collection Services Inc",
    subject: "Dispute Resolution",
    date: "2025-01-08",
    status: "read",
    preview: "Regarding your recent dispute claim, we have reviewed...",
    important: false
  }
];

export const invoices = [
  {
    id: "INV-2025-001",
    date: "2025-01-15",
    amount: "$29.99",
    status: "Paid",
    description: "Premium Protected Services - Monthly"
  },
  {
    id: "INV-2023-012",
    date: "2023-12-15",
    amount: "$29.99",
    status: "Paid",
    description: "Premium Protected Services - Monthly"
  },
  {
    id: "INV-2023-011",
    date: "2023-11-15",
    amount: "$29.99",
    status: "Paid",
    description: "Premium Protected Services - Monthly"
  },
  {
    id: "INV-2023-010",
    date: "2023-10-15",
    amount: "$29.99",
    status: "Paid",
    description: "Premium Protected Services - Monthly"
  }
];

export const stats = {
  totalCallsReceived: 127,
  unreadMail: 8,
  serviceActive: "Active",
  messagesSent: 45
};

export const notifications = [
  { id: 1, type: 'call', message: 'Call received from (555) 123-4567', time: '2 minutes ago' },
  { id: 2, type: 'mail', message: 'Mail scanned from Amazon', time: '15 minutes ago' },
  { id: 3, type: 'settings', message: 'Service settings updated', time: '1 hour ago' },
  { id: 4, type: 'call', message: 'Voicemail message left by John Smith', time: '2 hours ago' },
  { id: 5, type: 'mail', message: 'Important mail scanned from Bank of America', time: '3 hours ago' }
];