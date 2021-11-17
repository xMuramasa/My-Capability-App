
package com.mycapability;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
// import com.mycapability.;

public class CountdownText extends GraphicOverlay.Graphic{
    
    // tiempo a imprimir
    private final int currentTime;
    private final Paint textPaint;

    CountdownText(GraphicOverlay overlay, int currentTime){
        super(overlay);
        this.currentTime = currentTime;

        textPaint = new Paint();
        textPaint.setColor(Color.WHITE);
        textPaint.setTextSize(60.0f);
        textPaint.setShadowLayer(5.0f, 0f, 0f, Color.BLACK);

        System.out.print("aaah xd < < < < <  <  < < < < < <!!! 1 !1 ! !");
    }

    @Override
    public void draw(Canvas canvas) {
        float x = (float) (canvas.getWidth() * 0.45);
        float y = (float) (canvas.getHeight() * 0.3);

        // canvas.drawText(String.valueOf(currentTime), x, y, textPaint);
        canvas.drawText("AAAAAAAAAAAHHHH", 20, 10, textPaint);

        System.out.print("yapoyapoyapoyapyaopoyapoyopyapo");
        
        // canvas1.drawText("User Name!", 30, 40, color);
    //     canvas.drawText(
    //         poseClassification.get(i),
    //         classificationX,
    //         classificationY,
    //         classificationTextPaint);
    }
}
