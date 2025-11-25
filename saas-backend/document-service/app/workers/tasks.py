"""Background worker tasks for document-service"""

import asyncio
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "../../../shared-libs"))
from shared_libs.database.redis import get_redis_client
from uuid import UUID


async def trigger_ocr_worker(document_id: UUID, tenant_id: UUID):
    """Trigger OCR processing worker"""
    redis_client = get_redis_client()
    task_data = {
        "document_id": str(document_id),
        "tenant_id": str(tenant_id),
        "task_type": "ocr"
    }
    await redis_client.lpush("document:ocr:queue", str(task_data))


async def trigger_virus_scan_worker(document_id: UUID, tenant_id: UUID):
    """Trigger virus scan worker"""
    redis_client = get_redis_client()
    task_data = {
        "document_id": str(document_id),
        "tenant_id": str(tenant_id),
        "task_type": "virus_scan"
    }
    await redis_client.lpush("document:virus:queue", str(task_data))


async def process_ocr_task():
    """Process OCR tasks from queue"""
    redis_client = get_redis_client()
    while True:
        task_data = await redis_client.brpop("document:ocr:queue", timeout=1)
        if task_data:
            # TODO: Implement OCR processing
            print(f"Processing OCR task: {task_data}")
        await asyncio.sleep(0.1)


async def process_virus_scan_task():
    """Process virus scan tasks from queue"""
    redis_client = get_redis_client()
    while True:
        task_data = await redis_client.brpop("document:virus:queue", timeout=1)
        if task_data:
            # TODO: Implement virus scanning
            print(f"Processing virus scan task: {task_data}")
        await asyncio.sleep(0.1)


async def start_workers():
    """Start all background workers"""
    await asyncio.gather(
        process_ocr_task(),
        process_virus_scan_task()
    )


if __name__ == "__main__":
    asyncio.run(start_workers())

