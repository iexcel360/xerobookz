"""Background worker tasks"""

import asyncio
from ..events.consumers import EventConsumer


async def start_workers():
    """Start background workers"""
    consumer = EventConsumer()
    await consumer.start()


if __name__ == "__main__":
    asyncio.run(start_workers())

