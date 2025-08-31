import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default calendar styles

// SVG component for the Scales of Justice icon
const JusticeScaleIcon = () => (
    <svg xmlns="https://img.favpng.com/17/8/17/lady-justice-symbol-measuring-scales-clip-art-png-favpng-7Ywe4694arCjq8A8zzQmSd3P4.jpg" width="80" height="80" fill="currentColor" className="bi bi-display-fill text-clerkly-primary" viewBox="0 0 16 16">
      <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
    </svg>
);


// Function to get a time-based greeting
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour>4 && hour < 11) return 'Good Morning';
    else if (hour>11 && hour < 16) return 'Good Afternoon';
    else if(hour>16 && hour<20) return 'Good Evening';
    else return 'Good Night';
};

// A list of law-related motivational quotes
const lawQuotes = [
    "The law is reason, free from passion.",
    "Justice delayed is justice denied.",
    "Injustice anywhere is a threat to justice everywhere.",
    "The first duty of society is justice.",
    "At his best, man is the noblest of all animals; separated from law and justice he is the worst."
];

// Get a random quote from the list
const dailyQuote = lawQuotes[Math.floor(Math.random() * lawQuotes.length)];

function DashboardHome() {
    const [date, setDate] = React.useState(new Date());
    const [events, setEvents] = React.useState({});

    const handleDayClick = (value) => {
        const eventDate = value.toDateString();
        const existingEvent = events[eventDate];
        const eventText = window.prompt(`Event for ${eventDate}:`, existingEvent || '');

        if (eventText) { // If user enters text and doesn't cancel
            setEvents(prevEvents => ({
                ...prevEvents,
                [eventDate]: eventText
            }));
        }
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const eventDate = date.toDateString();
            if (events[eventDate]) {
                return <p className="event-marker">.</p>;
            }
        }
        return null;
    };

    return (
        <div className="container-fluid">
            <div className="row g-4">
                {/* Left Column: Greeting, Quote, Symbol */}
                <div className="col-lg-6 d-flex flex-column">
                    <div className="mb-4">
                        <h1 className="font-serif display-5 fw-bold text-clerkly-dark">{getGreeting()}</h1>
                        <p className="fs-5 text-secondary">What’s on your agenda today?</p>
                    </div>

                    <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center bg-light rounded-4 p-4 text-center">
                        
                        <p className="font-serif fst-italic fs-4 mt-4 text-clerkly-dark">"{dailyQuote}"</p>
                    </div>
                </div>

                {/* Right Column: Calendar */}
                <div className="col-lg-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <Calendar
                                onChange={setDate}
                                value={date}
                                onClickDay={handleDayClick}
                                tileContent={tileContent}
                                className="w-100 border-0"
                            />
                             <div className="mt-3 p-3 bg-light rounded">
                                <h6 className="font-serif">Upcoming Event</h6>
                                {events[date.toDateString()] ? (
                                    <p className="m-0">{events[date.toDateString()]}</p>
                                ) : (
                                    <p className="m-0 text-muted">No event for today. Click a date to add one.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;

