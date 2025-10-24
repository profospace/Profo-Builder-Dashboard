import StatCard from "./StatCard";

const StatsSection = ({ stats }) => {
    if (!stats) return null;

    const statCards = [
        {
            icon: <Package className="text-blue-600" size={24} />,
            title: "Total Offers",
            value: stats.totalOffers,
            bgColor: "bg-blue-50",
        },
        {
            icon: <TrendingUp className="text-green-600" size={24} />,
            title: "Active Offers",
            value: stats.activeOffers,
            bgColor: "bg-green-50",
        },
        {
            icon: <Users className="text-purple-600" size={24} />,
            title: "Total Usage",
            value: stats.totalUsage,
            bgColor: "bg-purple-50",
        },
        {
            icon: <Calendar className="text-orange-600" size={24} />,
            title: "Usage Rate",
            value: `${stats.totalPossibleUsage > 0 ? Math.round((stats.totalUsage / stats.totalPossibleUsage) * 100) : 0}%`,
            bgColor: "bg-orange-50",
        },
    ];

    return (
        <div className="mb-8">
            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-4 gap-6">
                {statCards.map((card, idx) => (
                    <StatCard key={idx} {...card} />
                ))}
            </div>

            {/* Mobile & Tablet Carousel */}
            <div className="lg:hidden overflow-x-auto snap-x snap-mandatory flex gap-4 px-4">
                {statCards.map((card, idx) => (
                    <div key={idx} className="snap-start">
                        <StatCard {...card} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsSection;
