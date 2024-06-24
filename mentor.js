class mentor
{
    constructor(degree, school, location, industry, position, skill)
    {
        this.degree = degree; 
        this.school = school;
        this.location = location; 
        this.industry = industry; 
        this.position = position; 
        this.skill = skill; 
    }
   
   
    //Accesors
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
    get skill()
    {
        return this.skill; 
    }
}