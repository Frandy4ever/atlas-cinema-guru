import { fetchActivities } from "@/lib/data";
import { auth } from "@/auth";
import { Activity, Clock, Star } from "lucide-react";

export async function ActivityFeed() {
  const session = await auth();
  
  if (!session?.user?.email) return null;

  const activities = await fetchActivities(1, session.user.email);

  return (
    <div className="text-white">
      <h3 className="font-semibold mb-3 flex items-center space-x-2">
        <Activity size={16} />
        <span>Latest Activity</span>
      </h3>
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="text-sm">
            <div className="flex items-center space-x-2 mb-1">
              {activity.activity === "FAVORITED" ? (
                <Star size={12} className="text-yellow-400" />
              ) : (
                <Clock size={12} className="text-blue-400" />
              )}
              <span className="text-gray-400 text-xs">
                {new Date(activity.timestamp).toLocaleDateString()} {new Date(activity.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-gray-300 truncate">
              {activity.title} - {activity.activity === "FAVORITED" ? "Favorited" : "Added to Watch Later"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}