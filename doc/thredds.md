---
title: Fetching forecast data from THREDDS
date: 2020-05-19
author: Geir Aalberg
layout: page
state: draft
tags:
    - guide
summary: >
    Guide to finding and extracting data and images from thredds.met.no
---

# THREDDS

## General documentation

- Data files: <https://thredds.met.no/thredds/metno.html>
- Documentation: <https://github.com/metno/NWPdocs/wiki>

## Models

### CMEPS

General information:

- [https://drive.google.com/file/d/0B-SaEtrDE91WWEJoNkJiUm5TNzg/view](https://drive.google.com/file/d/0B-SaEtrDE91WWEJoNkJiUm5TNzg/view)

About changes from MEPS to CMEPS, Feb 2020:

- [https://thredds.met.no/thredds/metno.html](https://thredds.met.no/thredds/metno.html)

### AROME-Arctic

- [https://www.met.no/en/projects/The-weather-model-AROME-Arctic/data_access](https://www.met.no/en/projects/The-weather-model-AROME-Arctic/data_access)

### Other models

- [https://drive.google.com/file/d/0B-SaEtrDE91WWDkzY3dpZlU1V00/view](https://drive.google.com/file/d/0B-SaEtrDE91WWDkzY3dpZlU1V00/view)


# Examples

## Extraction of metadata using ncdump

    https://thredds.met.no/thredds/catalog/metpplatest/catalog.html?dataset=metpplatest/met_forecast_1_0km_nordic_latest.nc

    $ export CMEPS=https://thredds.met.no/thredds/dodsC/metpplatest/met_forecast_1_0km_nordic_latest.nc

    $ ncdump -h $CMEPS
    netcdf met_forecast_1_0km_nordic_latest {
    dimensions:
        time = UNLIMITED ; // (57 currently)
        x = 1796 ;
        y = 2321 ;
    variables:
        double forecast_reference_time ;
            forecast_reference_time:units = "seconds since 1970-01-01 00:00:00 +00:00" ;
            forecast_reference_time:standard_name = "forecast_reference_time" ;
        int projection_lcc ;
            projection_lcc:grid_mapping_name = "lambert_conformal_conic" ;
            projection_lcc:standard_parallel = 63., 63. ;
            projection_lcc:longitude_of_central_meridian = 15. ;
            projection_lcc:latitude_of_projection_origin = 63. ;
            projection_lcc:earth_radius = 6371000. ;
            projection_lcc:proj4 = "+proj=lcc +lat_0=63 +lon_0=15 +lat_1=63 +lat_2=63 +no_defs +R=6.371e+06" ;
        double time(time) ;
            time:long_name = "time" ;
            time:standard_name = "time" ;
            time:units = "seconds since 1970-01-01 00:00:00 +00:00" ;
            time:_ChunkSizes = 1 ;
        double x(x) ;
            x:standard_name = "projection_x_coordinate" ;
            x:units = "m" ;
            x:_ChunkSizes = 1796 ;
        double y(y) ;
            y:standard_name = "projection_y_coordinate" ;
            y:units = "m" ;
            y:_ChunkSizes = 2321 ;
        float altitude(y, x) ;
            altitude:units = "m" ;
            altitude:standard_name = "surface_altitude" ;
            altitude:grid_mapping = "projection_lcc" ;
            altitude:coordinates = "longitude latitude" ;
            altitude:_ChunkSizes = 31, 1796 ;
        float land_area_fraction(y, x) ;
            land_area_fraction:standard_name = "land_area_fraction" ;
            land_area_fraction:grid_mapping = "projection_lcc" ;
            land_area_fraction:coordinates = "longitude latitude" ;
            land_area_fraction:units = "1" ;
            land_area_fraction:_ChunkSizes = 31, 1796 ;
        double latitude(y, x) ;
            latitude:units = "degree_north" ;
            latitude:long_name = "latitude" ;
            latitude:standard_name = "latitude" ;
            latitude:grid_mapping = "projection_lcc" ;
            latitude:_ChunkSizes = 31, 1796 ;
        double longitude(y, x) ;
            longitude:units = "degree_east" ;
            longitude:long_name = "longitude" ;
            longitude:standard_name = "longitude" ;
            longitude:grid_mapping = "projection_lcc" ;
            longitude:_ChunkSizes = 31, 1796 ;
        float air_temperature_2m(time, y, x) ;
            air_temperature_2m:coordinates = "longitude latitude" ;
            air_temperature_2m:units = "K" ;
            air_temperature_2m:standard_name = "air_temperature" ;
            air_temperature_2m:grid_mapping = "projection_lcc" ;
            air_temperature_2m:_ChunkSizes = 1, 31, 1796 ;
        float precipitation_amount(time, y, x) ;
            precipitation_amount:coordinates = "longitude latitude" ;
            precipitation_amount:units = "kg/m^2" ;
            precipitation_amount:standard_name = "precipitation_amount" ;
            precipitation_amount:grid_mapping = "projection_lcc" ;
            precipitation_amount:_ChunkSizes = 1, 31, 1796 ;
        float wind_direction_10m(time, y, x) ;
            wind_direction_10m:coordinates = "longitude latitude" ;
            wind_direction_10m:units = "degrees" ;
            wind_direction_10m:standard_name = "wind_direction" ;
            wind_direction_10m:grid_mapping = "projection_lcc" ;
            wind_direction_10m:_ChunkSizes = 1, 31, 1796 ;
        float wind_speed_10m(time, y, x) ;
            wind_speed_10m:coordinates = "longitude latitude" ;
            wind_speed_10m:units = "m/s" ;
            wind_speed_10m:standard_name = "wind_speed" ;
            wind_speed_10m:grid_mapping = "projection_lcc" ;
            wind_speed_10m:_ChunkSizes = 1, 31, 1796 ;
        float wind_speed_of_gust(time, y, x) ;
            wind_speed_of_gust:coordinates = "longitude latitude" ;
            wind_speed_of_gust:units = "m/s" ;
            wind_speed_of_gust:standard_name = "wind_speed_of_gust" ;
            wind_speed_of_gust:grid_mapping = "projection_lcc" ;
            wind_speed_of_gust:_ChunkSizes = 1, 31, 1796 ;
        float cloud_area_fraction(time, y, x) ;
            cloud_area_fraction:coordinates = "longitude latitude" ;
            cloud_area_fraction:units = "1" ;
            cloud_area_fraction:standard_name = "cloud_area_fraction" ;
            cloud_area_fraction:grid_mapping = "projection_lcc" ;
            cloud_area_fraction:_ChunkSizes = 1, 31, 1796 ;
        float air_pressure_at_sea_level(time, y, x) ;
            air_pressure_at_sea_level:units = "Pa" ;
            air_pressure_at_sea_level:standard_name = "air_pressure_at_sea_level" ;
            air_pressure_at_sea_level:grid_mapping = "projection_lcc" ;
            air_pressure_at_sea_level:coordinates = "longitude latitude" ;
            air_pressure_at_sea_level:_ChunkSizes = 1, 31, 1796 ;
        float integral_of_surface_downwelling_shortwave_flux_in_air_wrt_time(time, y, x) ;
            integral_of_surface_downwelling_shortwave_flux_in_air_wrt_time:coordinates = "longitude latitude" ;
            integral_of_surface_downwelling_shortwave_flux_in_air_wrt_time:units = "W s/m^2" ;
            integral_of_surface_downwelling_shortwave_flux_in_air_wrt_time:standard_name = "integral_of_surface_downwelling_shortwave_flux_in_air_wrt_time" ;
            integral_of_surface_downwelling_shortwave_flux_in_air_wrt_time:grid_mapping = "projection_lcc" ;
            integral_of_surface_downwelling_shortwave_flux_in_air_wrt_time:_ChunkSizes = 1, 31, 1796 ;
        float relative_humidity_2m(time, y, x) ;
            relative_humidity_2m:coordinates = "longitude latitude" ;
            relative_humidity_2m:units = "1" ;
            relative_humidity_2m:standard_name = "relative_humidity" ;
            relative_humidity_2m:grid_mapping = "projection_lcc" ;
            relative_humidity_2m:_ChunkSizes = 1, 31, 1796 ;

    // global attributes:
            :institution = "Norwegian Meteorological Institute, met.no" ;
            :creator_url = "met.no" ;
            :geospatial_lat_min = "51.0" ;
            :geospatial_lat_max = "88.0" ;
            :geospatial_lon_min = "-20.0" ;
            :geospatial_lon_max = "80.0" ;
            :references = "unknown" ;
            :license = "http://met.no/sb5-met.no/Forskning/Informasjonsteknologi/Tilgang_til_data/" ;
            :source = "meps" ;
            :summary = "Based on model data from MEPS (MetCoOp-Ensemble Prediction System) and observations from met.no, Netatmo, and Bergensvaeret." ;
            :Conventions = "CF-1.0" ;
            :NCO = "netCDF Operators version 4.7.9 (Homepage = http://nco.sf.net, Code = http://github.com/nco/nco)" ;
            :meps_forecast_reference_time = "1583744400" ;
            :DODS_EXTRA.Unlimited_Dimension = "time" ;
    }
