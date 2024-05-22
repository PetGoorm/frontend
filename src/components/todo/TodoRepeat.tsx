import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
} from '@mui/material';

export default function RepeatSettingsDialog({ open, onClose, onConfirm }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [repeatType, setRepeatType] = useState('');
  const [monthlyRepeatDay, setMonthlyRepeatDay] = useState('');
  const [weeklyRepeatDays, setWeeklyRepeatDays] = useState({
    월: false,
    화: false,
    수: false,
    목: false,
    금: false,
    토: false,
    일: false,
  });

  const handleConfirm = () => {
    const settings = {
      startDate,
      endDate,
      repeatType,
      monthlyRepeatDay,
      weeklyRepeatDays,
    };
    onConfirm(settings);
  };

  const renderAdditionalFields = () => {
    switch (repeatType) {
      case 'MONTHLY':
        return (
          <>
            <Typography variant="subtitle1" gutterBottom>
              매월 반복 날짜 선택
            </Typography>
            <TextField
              type="number"
              value={monthlyRepeatDay}
              onChange={(e) => setMonthlyRepeatDay(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
          </>
        );
      case 'WEEKLY':
        return (
          <>
            <Typography variant="subtitle1" gutterBottom>
              매주 반복 요일 선택
            </Typography>
            <FormGroup row>
              {Object.keys(weeklyRepeatDays).map((day) => (
                <FormControlLabel
                  key={day}
                  control={<Checkbox checked={weeklyRepeatDays[day]} onChange={(e) => setWeeklyRepeatDays({ ...weeklyRepeatDays, [day]: e.target.checked })} />}
                  label={day}
                />
              ))}
            </FormGroup>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>반복 설정</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom>
          시작 날짜
        </Typography>
        <TextField
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Typography variant="subtitle1" gutterBottom>
          종료 날짜
        </Typography>
        <TextField
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControl component="fieldset" fullWidth>
          <FormLabel component="legend">반복 주기</FormLabel>
          <RadioGroup
            aria-label="repeatType"
            name="repeatType"
            value={repeatType}
            onChange={(e) => setRepeatType(e.target.value)}
          >
            
            <FormControlLabel value="DAILY" control={<Radio />} label="매일" />
            <FormControlLabel value="WEEKLY" control={<Radio />} label="매주" />
            <FormControlLabel value="MONTHLY" control={<Radio />} label="매월" />
          </RadioGroup>
        </FormControl>
        {renderAdditionalFields()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleConfirm}>확인</Button>
      </DialogActions>
    </Dialog>
  );
}
