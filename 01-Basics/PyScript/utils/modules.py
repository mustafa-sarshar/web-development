from datetime import datetime, date

def get_current_time():
    return datetime.now().strftime("%H:%M:%S")

def get_current_date():
    return date.today().strftime("%A %B %d, %Y")
