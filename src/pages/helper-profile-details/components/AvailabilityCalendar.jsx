import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AvailabilityCalendar = ({ availability, emergencyAvailable, preferredAreas }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    const year = date?.getFullYear();
    const month = date?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay?.getDate();
    const startingDayOfWeek = firstDay?.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days?.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days?.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isSelected = (date) => {
    if (!date) return false;
    return date?.toDateString() === selectedDate?.toDateString();
  };

  const getAvailabilityForDate = (date) => {
    if (!date) return null;
    const dayName = daysOfWeek?.[date?.getDay()]?.toLowerCase();
    return availability?.[dayName] || null;
  };

  const getAvailabilityColor = (availabilityData) => {
    if (!availabilityData || !availabilityData?.available) return 'bg-muted text-muted-foreground';
    if (availabilityData?.emergency) return 'bg-error text-error-foreground';
    return 'bg-success text-success-foreground';
  };

  const formatTimeSlot = (slot) => {
    return `${slot?.start} - ${slot?.end}`;
  };

  const selectedDateAvailability = getAvailabilityForDate(selectedDate);

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Calendar" size={20} color="var(--color-primary)" />
        Availability & Schedule
      </h3>
      {/* Emergency Availability Banner */}
      {emergencyAvailable && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-error)" />
            <span className="text-error font-medium">Available for Emergency Calls</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Responds to urgent requests within 15 minutes
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth(-1)}
              iconName="ChevronLeft"
              iconSize={16}
            />
            <h4 className="font-medium text-foreground">
              {months?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
            </h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth(1)}
              iconName="ChevronRight"
              iconSize={16}
            />
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek?.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth)?.map((date, index) => {
              const availabilityData = getAvailabilityForDate(date);
              return (
                <button
                  key={index}
                  onClick={() => date && setSelectedDate(date)}
                  disabled={!date}
                  className={`
                    h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 animate-press
                    ${!date ? 'invisible' : ''}
                    ${isSelected(date) ? 'ring-2 ring-primary' : ''}
                    ${isToday(date) ? 'ring-1 ring-accent' : ''}
                    ${getAvailabilityColor(availabilityData)}
                    ${date && !availabilityData?.available ? 'opacity-50' : ''}
                  `}
                >
                  {date?.getDate()}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded"></div>
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-error rounded"></div>
              <span className="text-muted-foreground">Emergency Only</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-muted rounded"></div>
              <span className="text-muted-foreground">Unavailable</span>
            </div>
          </div>
        </div>

        {/* Selected Date Details */}
        <div>
          <h4 className="font-medium text-foreground mb-3">
            {selectedDate?.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>

          {selectedDateAvailability ? (
            <div className="space-y-4">
              {selectedDateAvailability?.available ? (
                <>
                  <div className="space-y-2">
                    <h5 className="font-medium text-foreground">Available Time Slots</h5>
                    {selectedDateAvailability?.timeSlots?.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <span className="text-foreground">{formatTimeSlot(slot)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          slot?.type === 'emergency' ?'bg-error/10 text-error' :'bg-success/10 text-success'
                        }`}>
                          {slot?.type === 'emergency' ? 'Emergency' : 'Regular'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {selectedDateAvailability?.notes && (
                    <div className="p-3 bg-muted/30 rounded-lg">
                      <h5 className="font-medium text-foreground mb-1">Notes</h5>
                      <p className="text-sm text-muted-foreground">{selectedDateAvailability?.notes}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-6">
                  <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" />
                  <p className="text-muted-foreground mt-2">Not available on this date</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <Icon name="Calendar" size={48} color="var(--color-muted-foreground)" />
              <p className="text-muted-foreground mt-2">No availability information</p>
            </div>
          )}

          {/* Preferred Service Areas */}
          <div className="mt-6">
            <h5 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Icon name="MapPin" size={16} color="var(--color-primary)" />
              Preferred Service Areas
            </h5>
            <div className="space-y-2">
              {preferredAreas?.map((area, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                  <span className="text-foreground">{area?.name}</span>
                  <span className="text-sm text-muted-foreground">{area?.distance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;