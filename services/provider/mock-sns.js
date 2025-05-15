class MockSNS {
  constructor() {
    this.sentMessages = [];
    this.deliveryStatus = {}; // Track delivery reports
  }

  async publish(params) {
    // Validate Ethiopian number format
    if (params.PhoneNumber.startsWith('+251') && !/^\+2519[0-9]{8}$/.test(params.PhoneNumber)) {
      throw new Error('Invalid Ethiopian number format. Expected +2519XXXXXXXX');
    }

    const messageId = `mock-${Date.now()}`;
    const message = {
      id: messageId,
      to: params.PhoneNumber,
      text: params.Message,
      timestamp: new Date().toISOString(),
      status: 'queued'
    };

    this.sentMessages.push(message);
    
    // Simulate delivery report after 2 seconds
    setTimeout(() => {
      this.deliveryStatus[messageId] = Math.random() > 0.1 ? 'delivered' : 'failed';
    }, 2000);

    return { MessageId: messageId };
  }

  // For testing delivery reports
  async checkDelivery(messageId) {
    return this.deliveryStatus[messageId] || 'pending';
  }

  // Get all sent messages (for debugging)
  getSentMessages() {
    return this.sentMessages;
  }
}

module.exports = new MockSNS();