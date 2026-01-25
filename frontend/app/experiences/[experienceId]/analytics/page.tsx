import { whopClient } from '@/lib/whop';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from '../../../components/layout/sidebar';
import { FiTrendingUp, FiDollarSign, FiUsers, FiShoppingBag } from 'react-icons/fi';
import AnalyticsChart from '../../../components/layout/AnalyticsChart';

export default async function AnalyticsPage() {
	const user = await getCurrentUser();
	const analytics = await whopClient.getAnalytics();

	const stats = [
		{
			label: 'Total Revenue',
			value: `$${analytics.total_revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
			icon: FiDollarSign,
			change: '+12.5%',
			changeType: 'positive' as const,
		},
		{
			label: 'Total Sales',
			value: analytics.total_sales.toLocaleString(),
			icon: FiShoppingBag,
			change: '+8.2%',
			changeType: 'positive' as const,
		},
		{
			label: 'Total Customers',
			value: analytics.total_customers.toLocaleString(),
			icon: FiUsers,
			change: '+15.3%',
			changeType: 'positive' as const,
		},
		{
			label: 'Average Order Value',
			value: `$${(analytics.total_revenue / analytics.total_sales).toFixed(2)}`,
			icon: FiTrendingUp,
			change: '+5.1%',
			changeType: 'positive' as const,
		},
	];

	return (
		<div className="flex min-h-screen bg-[#0a0a0a]">
			<Sidebar user={user || { name: 'User', username: 'user' }} />

			<main className="flex-1 ml-64 p-8">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
						<p className="text-gray-400">Track your store performance and sales metrics</p>
					</div>

					{/* Stats Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						{stats.map((stat) => {
							const Icon = stat.icon;
							return (
								<div
									key={stat.label}
									className="bg-[#111] border border-white/10 rounded-xl p-6"
								>
									<div className="flex items-center justify-between mb-4">
										<div className="p-3 bg-[#fa4616]/20 rounded-lg">
											<Icon className="text-[#fa4616]" size={24} />
										</div>
										<span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
											}`}>
											{stat.change}
										</span>
									</div>
									<p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
									<p className="text-sm text-gray-400">{stat.label}</p>
								</div>
							);
						})}
					</div>

					{/* Revenue Chart */}
					<div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
						<h2 className="text-xl font-semibold text-white mb-6">Revenue Over Time</h2>
						<AnalyticsChart data={analytics.revenue_by_period} />
					</div>

					{/* Product Performance */}
					<div className="bg-[#111] border border-white/10 rounded-xl p-6">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl font-semibold text-white">Product Performance</h2>
							<button className="text-sm text-gray-400 hover:text-[#fa4616] transition-colors">
								View All
							</button>
						</div>
						<div className="space-y-3">
							{analytics.sales_by_product.map((product, index) => (
								<div
									key={product.product_id}
									className="flex items-center justify-between p-4 bg-[#0a0a0a] rounded-lg border border-white/5 hover:border-[#fa4616]/30 transition-colors group"
								>
									<div className="flex items-center gap-4 flex-1">
										<div className="w-10 h-10 rounded-lg bg-[#fa4616]/20 flex items-center justify-center text-[#fa4616] font-bold">
											{index + 1}
										</div>
										<div className="flex-1">
											<p className="text-white font-medium mb-1 group-hover:text-[#fa4616] transition-colors">
												{product.product_name}
											</p>
											<div className="flex items-center gap-4 text-sm text-gray-400">
												<span>{product.sales} sales</span>
												<span>•</span>
												<span className="text-[#fa4616] font-semibold">
													${product.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
												</span>
											</div>
										</div>
									</div>
									<div className="text-right">
										<p className="text-lg font-semibold text-white">
											${(product.revenue / product.sales).toFixed(2)}
										</p>
										<p className="text-xs text-gray-400">Avg. price</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
