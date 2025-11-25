"""Event consumers"""

import aio_pika
import json
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.events import EventEnvelope

from ..config import settings


class EventConsumer:
    """Consume events from RabbitMQ"""
    
    async def start(self):
        """Start consuming events"""
        connection = await aio_pika.connect_robust(settings.RABBITMQ_URI)
        channel = await connection.channel()
        
        exchange = await channel.declare_exchange(
            "xerobookz.events",
            aio_pika.ExchangeType.TOPIC
        )
        
        queue = await channel.declare_queue("auth-service.events", durable=True)
        await queue.bind(exchange, routing_key="user.*")
        
        async def process_message(message: aio_pika.IncomingMessage):
            async with message.process():
                try:
                    event_data = json.loads(message.body.decode())
                    event = EventEnvelope(**event_data)
                    await self.handle_event(event)
                except Exception as e:
                    print(f"Error processing message: {e}")
        
        await queue.consume(process_message)
    
    async def handle_event(self, event: EventEnvelope):
        """Handle incoming event"""
        # Implement event handling logic
        print(f"Received event: {event.event_type}")

