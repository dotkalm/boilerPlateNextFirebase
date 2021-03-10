SELECT * 
FROM county  c
    LEFT JOIN LATERAL ( 
        SELECT * FROM faces As face WHERE ST_Contains(c.the_geom, face.the_geom)
    ) as e ON (c.countyfp = e.countyfp00)
WHERE c.name = 'Loudoun';



SELECT e.name
FROM county c
    LEFT JOIN LATERAL (
        SELECT * FROM place As p WHERE ST_Contains(c.the_geom, p.the_geom)
    ) as e ON (c.statefp = e.statefp)
WHERE c.name = 'Loudoun';
