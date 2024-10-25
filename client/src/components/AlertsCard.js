import React from "react";

const AlertsCard = ({ alerts }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md backdrop-blur-md bg-opacity-70">
      <h2 className="text-2xl font-bold text-red-600">Alerts</h2>
      {alerts ? (
        <div className="mt-4">
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <p key={index} className="text-red-500">
                {alert.message}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No alerts at this moment.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default AlertsCard;
