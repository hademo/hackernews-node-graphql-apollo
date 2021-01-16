async function feed(parent, args, context, info) {
    // filter: String
    // skip: Int
    // take: Int
    // orderBy: LinkOrderByInput
    const where = args.filter ? {

        OR: [{
            description: { contains: args.filter }
        }, {
            url: { contains: args.filter }
        }]
    } : {}

    const links = await context.prisma.link.findMany({
        where,
        skip: args.skip,
        take: args.take,
        orderBy: args.orderBy
    })

    const count = await context.prisma.link.count({ where })

    return { links, count }
}

module.exports = {
    feed
}