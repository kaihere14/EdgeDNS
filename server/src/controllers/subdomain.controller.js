import redis from "../db/redisDb.js";
import {prisma} from "../db/sqlDB.js";


export const registerSubDomainData = async (req, res) => {
    const { subdomain, data } = req.body;
    try {
        await redis.set(subdomain, JSON.stringify(data));// Store data as a JSON string
        await prisma.dnsRecord.create({
            data: {
                userId: req.userId,
                domain: subdomain,
                type: data.type,
                target: data.target,
                ttl: data.ttl || 3600,
            },
        });
        res.status(200).json({ message: "Subdomain data cached successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error caching subdomain data", error });
    }
};

export const getSubDomainsData = async (req, res) => {
   try{
    const records = await prisma.dnsRecord.findMany({
        where: {
            userId: req.userId,
        },
    });
    res.status(200).json({ data: records });    
   }catch(error){
    res.status(500).json({ message: "Error retrieving subdomain data", error });
   }
};

export const deleteSubDomainData = async (req, res) => {
    const { subdomain } = req.body;
    try {
        await redis.del(subdomain);
        await prisma.dnsRecord.deleteMany({
            where: {
                domain: subdomain,
                userId: req.userId,
            },
        });
        res.status(200).json({ message: "Subdomain data deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting subdomain data", error });
    }
};