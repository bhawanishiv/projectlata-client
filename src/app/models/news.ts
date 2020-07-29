export interface News {
    newsId: string;
    title: string;
    descriptions: string[];
    category: NewsCategory;
    publishedOn: Date;
    more?: any;
    links?: Link[]
}

export interface NewsCategory {
    categoryId: string;
    category: string;
}

export interface Link {
    href: string;
    name: string;
    external?: boolean;
}

