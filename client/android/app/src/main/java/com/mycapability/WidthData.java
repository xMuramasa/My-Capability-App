package com.mycapability;

import org.joda.time.Instant;

//datos de altura a guardar en arreglo "heights"
public class WidthData {
  
  public Instant timestamp; //tiempo
  public double X;      //coordenada de tobillo izquierdo
  public double Y;      //coordenada de tobillo izquierdo

  public WidthData(Instant timestamp, double x, double y) {
    this.timestamp = timestamp;
    this.X = x;
    this.Y = y;
  }

  public Instant getTimestamp() {
    return timestamp;
  }

  //invertidos por orientación de cámara (por mientras (quizás))
  public double getX() {
    return X;
  }
  // xd
  public double getY() {
    return Y;
  }
}
  