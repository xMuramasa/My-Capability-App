package com.mycapability;

import org.joda.time.Instant;

//datos de altura a guardar en arreglo "heights"
public class HeightData {
  
    public Instant timestamp; //tiempo
    public double coord;      //coordenada de tobillo izquierdo
  
    public HeightData(Instant timestamp, double coord) {
      this.timestamp = timestamp;
      this.coord = coord;
    }

    public double getCoord(){
        return this.coord;
    }
    public Instant getTimestamp(){
        return this.timestamp;
    }
}
  