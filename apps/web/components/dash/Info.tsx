import { Calendar, Clock, Activity, CheckCircle2, AlertCircle } from 'lucide-react';

const Info = () => {
  const sessions = [
    {
      id: 1,
      date: '2024-12-26',
      type: 'Regular Session',
      status: 'Completed',
      time: '10:00 AM',
      notes: 'Discussion on weekly progress',
    },
    {
      id: 2,
      date: '2024-12-20',
      type: 'Progress Review',
      status: 'Completed',
      time: '2:30 PM',
      notes: 'Monthly progress evaluation',
    },
    {
      id: 3,
      date: '2024-12-30',
      type: 'Regular Session',
      status: 'Scheduled',
      time: '11:15 AM',
      notes: 'Upcoming session',
    },
  ];

  const stats = [
    {
      id: 1,
      name: 'Sessions Completed',
      value: '24',
      icon: CheckCircle2,
      change: 'Regular attendance',
    },
    { id: 2, name: 'Next Session', value: 'Dec 30', icon: Calendar, change: '11:15 AM' },
    {
      id: 3,
      name: 'Consultation Length',
      value: '6 months',
      icon: Clock,
      change: 'Since June 2024',
    },
    { id: 4, name: 'Progress Score', value: '85%', icon: Activity, change: 'Good improvement' },
  ];

  const upcomingTasks = [
    {
      id: 1,
      title: 'Complete Session Worksheet',
      deadline: 'Before next session',
      status: 'urgent',
    },
    { id: 2, title: 'Daily Mood Journal Entry', deadline: 'Today', status: 'normal' },
    { id: 3, title: 'Practice Relaxation Exercise', deadline: 'Daily task', status: 'normal' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Treatment Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Welcome back, Alex! Here's an overview of your therapy progress.
          </p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700">
          Schedule Next Session
        </button>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Your Therapist</h2>
            <div className="mt-4">
              <p className="text-lg font-medium">Dr. Sarah Johnson</p>
              <p className="text-gray-500">Clinical Psychologist</p>
              <p className="text-gray-500">15 years of experience</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-blue-600">Next Session</p>
            <p className="text-lg">December 30, 2024</p>
            <p className="text-gray-500">11:15 AM</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="transform rounded-xl bg-white p-6 shadow-md transition duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className="h-8 w-8 text-blue-600" />
            </div>
            <p className="mt-2 text-sm text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Session History */}
        <div className="rounded-xl bg-white p-6 shadow-md lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Session History</h2>
            <button className="text-blue-600 hover:text-blue-800">View All Sessions</button>
          </div>
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-lg p-4 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`rounded-full p-2 ${session.status === 'Completed' ? 'bg-green-100' : 'bg-blue-100'}`}
                  >
                    {session.status === 'Completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{session.type}</p>
                    <p className="text-sm text-gray-500">{session.notes}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{session.date}</p>
                  <p className="text-sm text-gray-500">{session.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Treatment Tasks</h2>
          <div className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center space-x-4 rounded-lg p-4 transition-colors hover:bg-gray-50"
              >
                <div
                  className={`rounded-full p-2 ${task.status === 'urgent' ? 'bg-red-100' : 'bg-yellow-100'}`}
                >
                  <AlertCircle
                    className={`h-5 w-5 ${task.status === 'urgent' ? 'text-red-600' : 'text-yellow-600'}`}
                  />
                </div>
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.deadline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Treatment Progress */}
        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Treatment Progress</h2>
          <div className="space-y-4">
            <div className="h-2 w-full rounded-full bg-gray-200">
              <div className="h-2 rounded-full bg-blue-600" style={{ width: '75%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Started: June 2024</span>
              <span>Current Phase: 3/4</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Your consistent attendance and engagement in sessions has contributed to significant
              progress in your treatment plan.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Latest Session Notes</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              <span className="font-medium">Last Session (Dec 26):</span>
              <br />
              - Discussed weekly progress and challenges
              <br />
              - Reviewed coping strategies
              <br />- Set goals for next session
            </p>
            <div className="mt-4 border-t pt-4">
              <p className="text-sm text-gray-500">
                Remember to practice the discussed techniques daily and maintain your mood journal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;
