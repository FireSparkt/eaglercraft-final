package net.md_5.bungee.eaglercraft;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;

// note that there's a few things not implemented, but I don't care.

public class ExpiringSet<T> extends HashSet<T> {
    private final long expiration;

    private final Map<T, Long> timestamps = new HashMap<>();

    public ExpiringSet(long expiration) {
        this.expiration = expiration;
    }

    public void checkForExpirations() {
        Iterator<T> iterator = this.timestamps.keySet().iterator();
        long now = System.currentTimeMillis();
        while (iterator.hasNext()) {
            T element = iterator.next();
            if (super.contains(element)) {
                if (this.timestamps.get(element) + this.expiration < now) {
                    iterator.remove();
                    super.remove(element);
                }
            } else {
                iterator.remove();
                super.remove(element);
            }
        }
    }

    public boolean add(T o) {
        checkForExpirations();
        boolean success = super.add(o);
        if (success) timestamps.put(o, System.currentTimeMillis());
        return success;
    }

    public boolean remove(Object o) {
        checkForExpirations();
        boolean success = super.remove(o);
        if (success) timestamps.remove(o);
        return success;
    }

    public void clear() {
        this.timestamps.clear();
        super.clear();
    }

    public boolean contains(Object o) {
        checkForExpirations();
        return super.contains(o);
    }
}
