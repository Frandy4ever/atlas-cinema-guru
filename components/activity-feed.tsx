import { fetchActivities } from "@/lib/data";
import { auth } from "@/auth";

export async function ActivityFeed() {
  const session = await auth();
  
  if (!session?.user?.email) return null;

  const activities = await fetchActivities(1, session.user.email);

  return (
    <div className="text-black">
      <h3 className="font-bold text-2xl mb-4">Latest Activities</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const date = new Date(activity.timestamp);
          const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}`;
          
          return (
            <div key={activity.id} className="text-base leading-relaxed">
              <div className="mb-1">
                {formattedDate}
              </div>
              <div>
                {activity.activity === "FAVORITED" ? (
                  <span>Favorited <strong>{activity.title}</strong></span>
                ) : (
                  <span>Added <strong>{activity.title}</strong> to watch later</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}