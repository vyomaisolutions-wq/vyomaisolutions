import { NextResponse } from "next/server";
import { connectToDatabase, getDbStatus } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { Project } from "@/models/Project";
import { Service } from "@/models/Service";
import { Contact } from "@/models/Contact";

export async function GET() {
  const conn = await connectToDatabase();
  const dbStatus = getDbStatus();

  let counts = {
    blogs: 0,
    projects: 0,
    services: 0,
    contacts: 0,
    newLeads: 0,
    totalViews: 0,
  };

  let recentLeads: unknown[] = [];
  let recentBlogs: unknown[] = [];

  if (conn) {
    try {
      const [blogCount, projCount, servCount, contactCount, newLeadCount] =
        await Promise.all([
          Blog.countDocuments(),
          Project.countDocuments(),
          Service.countDocuments(),
          Contact.countDocuments(),
          Contact.countDocuments({ status: "new" }),
        ]);

      // Calculate total blog views
      const viewsAggregation = await Blog.aggregate([
        { $group: { _id: null, total: { $sum: "$views" } } },
      ]);
      const totalViews = viewsAggregation[0]?.total || 0;

      counts = {
        blogs: blogCount,
        projects: projCount,
        services: servCount,
        contacts: contactCount,
        newLeads: newLeadCount,
        totalViews,
      };

      recentLeads = await Contact.find().sort({ createdAt: -1 }).limit(5).lean();
      recentBlogs = await Blog.find().sort({ createdAt: -1 }).limit(5).lean();
    } catch (e) {
      console.warn("Failed fetching MongoDB stats:", e);
    }
  }

  return NextResponse.json({
    status: "ok",
    db: dbStatus,
    counts,
    recentLeads,
    recentBlogs,
  });
}
