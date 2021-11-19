export type element = {
    title: string,
    date: string,
    event: string,
    url: string
}

export type embed = {
    color: string,
    author: {
        name: string
    },
    title: string,
    url: string,
    thumbnail: {
        url?: string
    },
    description: string,
    footer: {
        text: string
    }
}