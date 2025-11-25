"""Repository for timesheet-service - Extended for Enterprise"""

from sqlalchemy.orm import Session
from uuid import UUID
from typing import Optional, List
from datetime import datetime, time

from ..models.db_models import AttendanceRecord, Schedule, Shift
from ..schemas.request import AttendanceClockInRequest, ScheduleCreate, ShiftCreate


class TimesheetRepository:
    """Timesheet repository - Extended for Enterprise"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def create_attendance_record(
        self,
        employee_id: UUID,
        location: Optional[str],
        tenant_id: UUID
    ) -> AttendanceRecord:
        """Create attendance record (clock in)"""
        record = AttendanceRecord(
            tenant_id=tenant_id,
            employee_id=employee_id,
            clock_in=datetime.now(),
            location=location
        )
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return record
    
    def update_attendance_record(
        self,
        record_id: UUID,
        tenant_id: UUID
    ) -> Optional[AttendanceRecord]:
        """Update attendance record (clock out)"""
        record = self.db.query(AttendanceRecord).filter(
            AttendanceRecord.id == record_id,
            AttendanceRecord.tenant_id == tenant_id
        ).first()
        if not record:
            return None
        
        record.clock_out = datetime.now()
        if record.clock_in:
            delta = record.clock_out - record.clock_in
            hours = delta.total_seconds() / 3600
            record.hours_worked = str(round(hours, 2))
        
        self.db.commit()
        self.db.refresh(record)
        return record
    
    def get_attendance_records(
        self,
        tenant_id: UUID,
        employee_id: Optional[UUID] = None
    ) -> List[AttendanceRecord]:
        """Get attendance records"""
        query = self.db.query(AttendanceRecord).filter(AttendanceRecord.tenant_id == tenant_id)
        if employee_id:
            query = query.filter(AttendanceRecord.employee_id == employee_id)
        return query.order_by(AttendanceRecord.clock_in.desc()).all()
    
    def create_schedule(self, data: ScheduleCreate, tenant_id: UUID) -> Schedule:
        """Create schedule"""
        schedule = Schedule(
            tenant_id=tenant_id,
            employee_id=data.employee_id,
            start_time=time.fromisoformat(data.start_time),
            end_time=time.fromisoformat(data.end_time),
            day_of_week=data.day_of_week,
            is_recurring=data.is_recurring
        )
        self.db.add(schedule)
        self.db.commit()
        self.db.refresh(schedule)
        return schedule
    
    def get_schedules(
        self,
        tenant_id: UUID,
        employee_id: Optional[UUID] = None
    ) -> List[Schedule]:
        """Get schedules"""
        query = self.db.query(Schedule).filter(Schedule.tenant_id == tenant_id)
        if employee_id:
            query = query.filter(Schedule.employee_id == employee_id)
        return query.all()
    
    def create_shift(self, data: ShiftCreate, tenant_id: UUID) -> Shift:
        """Create shift"""
        shift = Shift(
            tenant_id=tenant_id,
            employee_id=data.employee_id,
            shift_date=datetime.fromisoformat(data.shift_date).date(),
            start_time=time.fromisoformat(data.start_time),
            end_time=time.fromisoformat(data.end_time),
            break_duration=data.break_duration
        )
        self.db.add(shift)
        self.db.commit()
        self.db.refresh(shift)
        return shift

