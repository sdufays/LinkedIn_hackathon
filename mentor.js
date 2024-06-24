class mentor
{
    constructor(degree, school, location, industry, position)
    {
        this.degree = degree; 
        this.school = school;
        this.location = location; 
        this.industry = industry; 
        this.position = position; 
    }

    get degree()
    {
        return this.degree; 
    }
    get school()
    {
        return this.school; 
    }
    get location()
    {
        return this.location;
    }
    get industry()
    {
        return this.industry;
    }
    get position()
    {
        return this.position; 
    }
}