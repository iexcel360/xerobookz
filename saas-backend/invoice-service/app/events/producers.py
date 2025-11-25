"""Event producers for invoice-service"""

import aio_pika
import json
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.schemas.events import EventEnvelope
from ..config import settings


class EventProducer:
    """Publish events to RabbitMQ"""
    
    def __init__(self):
        self.connection = None
        self.channel = None
    
    async def connect(self):
        self.connection = await aio_pika.connect_robust(settings.RABBITMQ_URI)
        self.channel = await self.connection.channel()
    
    async def publish(self, event: EventEnvelope):
        if not self.channel:
            await self.connect()
        
        exchange = await self.channel.declare_exchange("xerobookz.events", aio_pika.ExchangeType.TOPIC)
        await exchange.publish(
            aio_pika.Message(
                body=json.dumps(event.model_dump(), default=str).encode(),
                content_type="application/json"
            ),
            routing_key=event.event_type.value
        )
    
    async def close(self):
        if self.connection:
            await self.connection.close()

