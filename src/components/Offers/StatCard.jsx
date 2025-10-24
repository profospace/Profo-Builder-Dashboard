const StatCard = ({ icon, title, value, bgColor }) => (
    <div className={`${bgColor} rounded-xl p-6 border border-gray-200`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-600 text-sm font-medium">{title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
                {icon}
            </div>
        </div>
    </div>
);

export default StatCard;